import { IExecuteOptions, IExecuteQueryOptions } from "../../common/interfaces/repository.interface"
import _ from "lodash"
import Repository from "./Repository"
import logger from "../../common/helpers/logger.helper"
import { postgresPool } from "../../bootstrap"

class PgBuilderRepository extends Repository {
  public readonly name = "PgBuilderRepository"
  private readonly replaceChar = "??"

  constructor(
    private questionMarkQuery = "",
    private params: any[] = [],

    private queryString = "",
    private queryParams: any[] = [],

    private selectQuery = "",
    private selectParams: any[] = [],

    private insertQuery = "",
    private insertParams: any[] = [],

    private updateQuery = "",
    private updateParams: any[] = [],

    private upsertQuery = "",
    private upsertParams: any[] = [],

    private deleteQuery = "",
    private deleteParams: any[] = [],

    private safeDeleteQuery = "",
    private safeDeleteParams: any[] = [],

    private restoreQuery = "",
    private restoreParams: any[] = [],

    private fromQuery = "",
    private fromParams: any[] = [],

    private whereQuery = "",
    private whereParams: any[] = [],

    private orderByQuery = "",
    private orderByParams: any[] = [],

    private groupByQuery = "",
    private groupByParams: any[] = [],

    private limitQuery = "",
    private limitParams: any[] = [],

    private offsetQuery = "",
    private offsetParams: any[] = [],

    private innerJoinQuery = "",
    private innerJoinParams: any[] = [],

    private leftJoinQuery = "",
    private leftJoinParams: any[] = [],

    private rightJoinQuery = "",
    private rightJoinParams: any[] = [],

    private leftOuterJoinQuery = "",
    private leftOuterJoinParams: any[] = [],

    private rightOuterJoinQuery = "",
    private rightOuterJoinParams: any[] = [],

    private fullOuterJoinQuery = "",
    private fullOuterJoinParams: any[] = [],

    private crossJoinQuery = "",
    private crossJoinParams: any[] = [],

    private unionQuery = "",
    private unionParams: any[] = [],

    private unionAllQuery = "",
    private unionAllParams: any[] = [],

    private intersectQuery = "",
    private intersectParams: any[] = [],

    private exceptQuery = "",
    private exceptParams: any[] = [],

    private havingQuery = "",
    private havingParams: any[] = [],

    private onConflictQuery = "",
    private onConflictParams: any[] = [],

    private returningQuery = "",
    private returningParams: any[] = []
  ) {
    super()
    this.reset()
  }

  /* -------------------------------------------------------------------------- */
  /*                                QUERY SECTION                               */
  /* -------------------------------------------------------------------------- */

  // ─── QUERY ──────────────────────────────────────────────────────────────────────
  /**
   *
   *
   * @protected
   * @param {string} queryArg
   * @param {any[]} [params=[]]
   * @return {*}  {this}
   * @memberof PgBuilderRepository
   *
   * Use ?? in query to replace the params on it. if you use PostgreSQL parameter like $1 getSQL dosent work currectly.
   *
   * Do not forget we you use query, the query is replaced to all other methods
   *
   * ```typescript
   * this.query("SELECT * FROM ??", ["<table_name>"])
   * ```
   */
  protected query(queryArg: string, params: any[] = []): this {
    this.queryString = queryArg
    this.queryParams = params
    return this
  }

  /* -------------------------------------------------------------------------- */
  /*                                CRUD SECTION                                */
  /* -------------------------------------------------------------------------- */

  // ─── INSERT ─────────────────────────────────────────────────────────────────────
  protected insert(tableName: string, insertArg: Record<string, any>, returning = "*"): this {
    const keys = _.keys(insertArg)
    const values = _.values(insertArg)

    this.insertQuery = `INSERT INTO ${this.replaceChar}
      (${keys.map(() => `${this.replaceChar}`).join(", ")})
      VALUES (${values
        .map((value) => `${typeof value === "string" ? `'${this.replaceChar}'` : this.replaceChar}`)
        .join(", ")})
      RETURNING ${returning}`
    this.insertParams = [tableName, ...keys, ...values]
    return this
  }

  // ─── UPDATE ─────────────────────────────────────────────────────────────────────
  protected update(tableName: string, id: string, updateArg: Record<string, any>, returning = "*"): this {
    const keys = _.keys(updateArg)
    const values = _.values(updateArg)

    this.updateParams.push(tableName)
    this.updateQuery = `UPDATE ${this.replaceChar} SET`

    for (let i = 0; i < keys.length; i++) {
      this.updateQuery += `\n\t${this.replaceChar} = ${
        typeof values[i] === "string" ? `'${this.replaceChar}'` : this.replaceChar
      }${i === keys.length - 1 ? "" : ","}`
      this.updateParams.push(keys[i])
      this.updateParams.push(values[i])
    }
    this.updateQuery += `
      WHERE id = (SELECT id FROM ${this.replaceChar} WHERE id = '${this.replaceChar}' LIMIT 1)
      RETURNING ${returning}`
    this.updateParams.push(tableName)
    this.updateParams.push(id)
    return this
  }

  // ─── UPSERT QUERY ───────────────────────────────────────────────────────────────
  protected upsert_query(tableName: string, args: Record<string, any>, returning = "*"): this {
    const { id } = args
    const sanitizedArgs = _.cloneDeep(_.omit(args, ["id"]))

    if (id) return this.update(tableName, id, sanitizedArgs, returning)
    else return this.insert(tableName, sanitizedArgs, returning)
  }

  // ─── DELETE ─────────────────────────────────────────────────────────────────────
  protected delete_query(tableName: string, id: string, returning = "*"): this {
    this.deleteQuery = `
      DELETE FROM ${this.replaceChar}
      WHERE id = (SELECT id FROM ${this.replaceChar} WHERE id = '${this.replaceChar}' LIMIT 1)
      RETURNING ${returning}`
    this.deleteParams = [tableName, tableName, id]
    return this
  }

  // ─── SAFE DELETE ────────────────────────────────────────────────────────────────
  protected safeDelete(tableName: string, id: string): this {
    this.safeDeleteQuery = `
      UPDATE ${this.replaceChar}
      SET deleted_at = NOW()
      WHERE id = (SELECT id FROM ${this.replaceChar} WHERE id = '${this.replaceChar}' LIMIT 1)
      RETURNING *`
    this.safeDeleteParams = [tableName, tableName, id]
    return this
  }

  // ─── RESTORE ────────────────────────────────────────────────────────────────────
  protected restore_query(tableName: string, id: string, returning = "*"): this {
    this.restoreQuery = `
      UPDATE ${this.replaceChar}
      SET deleted_at = NULL
      WHERE id = (SELECT id FROM ${this.replaceChar} WHERE id = '${this.replaceChar}' LIMIT 1)
      RETURNING ${returning}`
    this.restoreParams = [tableName, tableName, id]
    return this
  }

  /* -------------------------------------------------------------------------- */
  /*                               SELECT SECTION                               */
  /* -------------------------------------------------------------------------- */

  // ─── SELECT ─────────────────────────────────────────────────────────────────────
  protected select(selectArg?: string | string[]): this {
    switch (typeof selectArg) {
      case "string":
        this.selectQuery = `SELECT ${this.replaceChar}`
        this.selectParams.push(selectArg)
        break

      case "object":
        this.selectQuery = `SELECT ${selectArg.map(() => `${this.replaceChar}`).join(", ")}`
        this.selectParams = [...selectArg]
        break

      default:
        this.selectQuery = `SELECT *`
        break
    }
    return this
  }

  // ─── FROM ───────────────────────────────────────────────────────────────────────
  protected from(fromArg: string): this {
    this.fromQuery = `FROM ${this.replaceChar}`
    this.fromParams.push(fromArg)
    return this
  }

  // ─── WHERE ──────────────────────────────────────────────────────────────────────
  protected where(whereArgs: string | string[] | Record<string, any>, params?: any[]): this {
    const whereArgsType = typeof whereArgs
    const isArray = Array.isArray(whereArgs)

    switch (whereArgsType) {
      case "string":
        this.whereQuery = `WHERE ${whereArgs}`
        if (params && params.length) this.whereParams = [...params]
        break

      case "object":
        if (isArray && whereArgs.length) {
          this.whereQuery = `WHERE ${whereArgs.join(" AND ")}`
          if (params && params.length) this.whereParams = [...params]
        } else if (!isArray && Object.keys(whereArgs).length) {
          this.whereQuery = `WHERE ${Object.entries(whereArgs)
            .map((entry) =>
              typeof entry[1] === "string" ? `"${entry[0]}" = '${entry[1]}'` : `"${entry[0]}" = ${entry[1]}`
            )
            .join(" AND ")}`
        } else {
          this.whereQuery = ``
        }
        break

      default:
        this.whereQuery = ``
        logger.warn(`${this.name}: where argument is not a string or string[] and we are not handling it`, {
          dest: "PgBuilderRepository.ts",
        })
        break
    }

    return this
  }

  // ─── ORDER BY ───────────────────────────────────────────────────────────────────
  protected orderBy(orderArgs: string | string[], sort: string | string[]): this {
    const orderArgsType = typeof orderArgs
    const isArgsArray = Array.isArray(orderArgs)
    const isSortArray = Array.isArray(sort)

    switch (orderArgsType) {
      case "string":
        this.orderByQuery = `\nORDER BY ${this.replaceChar} ${this.replaceChar}`
        this.orderByParams = [orderArgs, sort]
        break

      case "object":
        if (isSortArray && isArgsArray && orderArgs.length === sort.length) {
          this.orderByQuery = `\nORDER BY ${orderArgs.map(() => this.replaceChar).join(", ")} ${sort
            .map(() => this.replaceChar)
            .join(", ")}`
          for (let i = 0; i < orderArgs.length; i++) {
            this.orderByParams.push(orderArgs[i])
            this.orderByParams.push(sort[i])
          }
        } else {
          this.orderByQuery = ``
          logger.error(`${this.name}: orderArgs and sort arguments are not the same type and length (in array mode)`, {
            dest: "PgBuilderRepository.ts",
          })
        }
        break

      default:
        this.orderByQuery = ``
        logger.warn(`${this.name}: orderBy argument is not a string or string[] and we are not handling it`, {
          dest: "PgBuilderRepository.ts",
        })
        break
    }
    return this
  }

  // ─── GROUP BY ───────────────────────────────────────────────────────────────────
  protected groupBy(groupByArg: string | string[]): this {
    switch (typeof groupByArg) {
      case "string":
        this.groupByQuery += `\nGROUP BY ${this.replaceChar}`
        this.groupByParams.push(groupByArg)
        break

      case "object":
        this.groupByQuery += `\nGROUP BY ${groupByArg.map(() => `${this.replaceChar}`).join(", ")}`
        this.groupByParams = [...groupByArg]
        break

      default:
        this.groupByQuery = ``
        logger.warn(`${this.name}: groupBy argument is not a string or string[] and we are not handling it`, {
          dest: "PgBuilderRepository.ts",
        })
        break
    }
    return this
  }

  // ─── LIMIT ──────────────────────────────────────────────────────────────────────
  protected limit(limitArg: number | string): this {
    this.limitQuery = `\nLIMIT ${this.replaceChar}`
    this.limitParams.push(limitArg)
    return this
  }

  // ─── OFFSET ─────────────────────────────────────────────────────────────────────
  protected offset(offsetArg: number | string): this {
    this.offsetQuery = `\nOFFSET ${this.replaceChar}`
    this.offsetParams.push(offsetArg)
    return this
  }

  /* -------------------------------------------------------------------------- */
  /*                                JOIN SECTION                                */
  /* -------------------------------------------------------------------------- */

  // ─── INNER JOIN ─────────────────────────────────────────────────────────────────
  protected innerJoin(innerJoinArg: string, on: string): this {
    this.innerJoinQuery += `\nINNER JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.innerJoinParams = [...this.innerJoinParams, innerJoinArg, on]
    return this
  }

  // ─── LEFT JOIN ──────────────────────────────────────────────────────────────────
  protected leftJoin(leftJoinArg: string, on: string): this {
    this.leftJoinQuery += `\nLEFT JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.leftJoinParams = [...this.leftJoinParams, leftJoinArg, on]
    return this
  }

  // ─── RIGHT JOIN ─────────────────────────────────────────────────────────────────
  protected rightJoin(rightJoinArg: string, on: string): this {
    this.rightJoinQuery += `\nRIGHT JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.rightJoinParams = [...this.rightJoinParams, rightJoinArg, on]
    return this
  }

  // ─── LEFT OUTER JOIN ────────────────────────────────────────────────────────────
  protected leftOuterJoin(leftOuterJoinArg: string, on: string): this {
    this.leftOuterJoinQuery += `\nLEFT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.leftOuterJoinParams = [...this.leftOuterJoinParams, leftOuterJoinArg, on]
    return this
  }

  // ─── RIGHT OUTER JOIN ───────────────────────────────────────────────────────────
  protected rightOuterJoin(rightOuterJoinArg: string, on: string): this {
    this.rightOuterJoinQuery += `\nRIGHT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.rightOuterJoinParams = [...this.rightOuterJoinParams, rightOuterJoinArg, on]
    return this
  }

  // ─── FULL JOIN ──────────────────────────────────────────────────────────────────
  protected fullOuterJoin(fullOuterJoinArg: string, on: string): this {
    this.fullOuterJoinQuery += `\nFULL OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`
    this.fullOuterJoinParams = [...this.fullOuterJoinParams, fullOuterJoinArg, on]
    return this
  }

  // ─── CROSS JOIN ─────────────────────────────────────────────────────────────────
  protected crossJoin(crossJoinArg: string): this {
    this.crossJoinQuery += `\nCROSS JOIN ${this.replaceChar}`
    this.crossJoinParams.push(crossJoinArg)
    return this
  }

  /* -------------------------------------------------------------------------- */
  /*                             AGGREGRATE SECTION                             */
  /* -------------------------------------------------------------------------- */

  // ──────────────────────────────────────────────────────────────────
  //   :::::: G E T   M A N Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  protected getMany(): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL()
      await this.executeQuery({ query })
        .then((result) => resolve(result.rows))
        .catch((err) => reject(err))
    })
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   O N E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getOne(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL()
      await this.executeQuery({ query })
        .then((result) => resolve(result.rows[0]))
        .catch((err) => reject(err))
    })
  }

  // ──────────────────────────────────────────────────────────────────────
  //   :::::: G E T   R E S U L T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  protected getResult(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL()
      await postgresPool.pool
        .query(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
  }

  // ─── EXECUTE QUERY ──────────────────────────────────────────────────────────────
  protected executeQuery(options: IExecuteQueryOptions): Promise<Record<string, any>> {
    const { query, parameters = [], omits = [] } = options
    const doNotReturn = _.includes(omits, "*")

    return new Promise(async (resolve, reject) => {
      await postgresPool.pool
        .query(query, parameters)
        .then((result) => {
          if (doNotReturn) return resolve({ rowCount: result.rowCount, rows: [] })
          else {
            const rows = result.rows.map((row) => _.omit(row, omits))
            return resolve({ rowCount: result.rowCount, rows })
          }
        })
        .catch((err) => reject(err))
    })
  }

  // ─── EXECUTE METHOD ─────────────────────────────────────────────────────────────
  protected exec(options: IExecuteOptions = { omits: [] }): Promise<any> {
    const { omits } = options

    return new Promise(async (resolve, reject) => {
      const query = this.getSQL()
      await this.executeQuery({ query, omits })
        .then((result) => resolve(result.rows))
        .catch((err) => reject(err))
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                           QUERY FUNCTION SECTION                           */
  /* -------------------------------------------------------------------------- */

  // ────────────────────────────────────────────────────────────────────
  //   :::::: G E T   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  protected getQuery(): { query: string; params: any[] } {
    this.generateAllQueryAndParams()
    const query = this.generateDollarQuery()
    const params = this.params

    this.reset()

    return { query, params }
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   S Q L : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getSQL(): string {
    this.generateAllQueryAndParams()

    let index = 0
    const query = this.questionMarkQuery.replaceAll(this.replaceChar, () => this.params[index++])

    this.reset()

    return query
  }

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   Q U E S T I O N   M A R K   Q U E R Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  private generateAllQueryAndParams(): { query: string; params: any[] } {
    // ────────────────────────────── GENERATE QUESTION MARK QUERY ─────
    if (this.queryString) this.questionMarkQuery = this.queryString
    else {
      this.questionMarkQuery = `
        ${this.selectQuery}
        ${this.fromQuery}
        ${this.whereQuery}`

      if (this.innerJoinQuery) this.questionMarkQuery += this.innerJoinQuery
      if (this.leftJoinQuery) this.questionMarkQuery += this.leftJoinQuery
      if (this.rightJoinQuery) this.questionMarkQuery += this.rightJoinQuery
      if (this.leftOuterJoinQuery) this.questionMarkQuery += this.leftOuterJoinQuery
      if (this.rightOuterJoinQuery) this.questionMarkQuery += this.rightOuterJoinQuery
      if (this.fullOuterJoinQuery) this.questionMarkQuery += this.fullOuterJoinQuery
      if (this.crossJoinQuery) this.questionMarkQuery += this.crossJoinQuery

      if (this.groupByQuery) this.questionMarkQuery += this.groupByQuery
      if (this.orderByQuery) this.questionMarkQuery += this.orderByQuery
      if (this.limitQuery) this.questionMarkQuery += this.limitQuery
      if (this.offsetQuery) this.questionMarkQuery += this.offsetQuery

      if (this.insertQuery) this.questionMarkQuery += this.insertQuery
      if (this.updateQuery) this.questionMarkQuery += this.updateQuery
      if (this.deleteQuery) this.questionMarkQuery += this.deleteQuery
      if (this.safeDeleteQuery) this.questionMarkQuery += this.safeDeleteQuery
      if (this.restoreQuery) this.questionMarkQuery += this.restoreQuery
    }

    // ─────────────────────────────────────────── GENERATE PARAMS ─────
    if (this.queryString || this.queryParams.length) this.params = this.queryParams
    else {
      this.params = [...this.selectParams, ...this.fromParams, ...this.whereParams]

      if (this.innerJoinParams.length) this.params = [...this.params, ...this.innerJoinParams]
      if (this.leftJoinParams.length) this.params = [...this.params, ...this.leftJoinParams]
      if (this.rightJoinParams.length) this.params = [...this.params, ...this.rightJoinParams]
      if (this.leftOuterJoinParams.length) this.params = [...this.params, ...this.leftOuterJoinParams]
      if (this.rightOuterJoinParams.length) this.params = [...this.params, ...this.rightOuterJoinParams]
      if (this.fullOuterJoinParams.length) this.params = [...this.params, ...this.fullOuterJoinParams]
      if (this.crossJoinParams.length) this.params = [...this.params, ...this.crossJoinParams]

      if (this.groupByParams.length) this.params = [...this.params, ...this.groupByParams]
      if (this.orderByParams.length) this.params = [...this.params, ...this.orderByParams]
      if (this.limitParams.length) this.params = [...this.params, ...this.limitParams]
      if (this.offsetParams.length) this.params = [...this.params, ...this.offsetParams]

      if (this.insertParams.length) this.params = [...this.params, ...this.insertParams]
      if (this.updateParams.length) this.params = [...this.params, ...this.updateParams]
      if (this.deleteParams.length) this.params = [...this.params, ...this.deleteParams]
      if (this.safeDeleteParams.length) this.params = [...this.params, ...this.safeDeleteParams]
      if (this.restoreParams.length) this.params = [...this.params, ...this.restoreParams]
    }

    return { query: this.questionMarkQuery, params: this.params }
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   D O L L A R   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────
  private generateDollarQuery(): string {
    let index = 0
    return this.questionMarkQuery.replaceAll(this.replaceChar, () => `$${++index}`)
  }

  /* -------------------------------------------------------------------------- */
  /*                                RESET SECTION                               */
  /* -------------------------------------------------------------------------- */
  private reset(): void {
    this.questionMarkQuery = ""
    this.params = []

    this.queryString = ""
    this.queryParams = []

    this.selectQuery = ""
    this.selectParams = []

    this.insertQuery = ""
    this.insertParams = []

    this.updateQuery = ""
    this.updateParams = []

    this.deleteQuery = ""
    this.deleteParams = []

    this.safeDeleteQuery = ""
    this.safeDeleteParams = []

    this.restoreQuery = ""
    this.restoreParams = []

    this.fromQuery = ""
    this.fromParams = []

    this.whereQuery = ""
    this.whereParams = []

    this.orderByQuery = ""
    this.orderByParams = []

    this.groupByQuery = ""
    this.groupByParams = []

    this.limitQuery = ""
    this.limitParams = []

    this.offsetQuery = ""
    this.offsetParams = []

    this.innerJoinQuery = ""
    this.innerJoinParams = []

    this.leftJoinQuery = ""
    this.leftJoinParams = []

    this.rightJoinQuery = ""
    this.rightJoinParams = []

    this.leftOuterJoinQuery = ""
    this.leftOuterJoinParams = []

    this.rightOuterJoinQuery = ""
    this.rightOuterJoinParams = []

    this.fullOuterJoinQuery = ""
    this.fullOuterJoinParams = []

    this.crossJoinQuery = ""
    this.crossJoinParams = []

    this.unionQuery = ""
    this.unionParams = []

    this.unionAllQuery = ""
    this.unionAllParams = []

    this.intersectQuery = ""
    this.intersectParams = []

    this.exceptQuery = ""
    this.exceptParams = []

    this.havingQuery = ""
    this.havingParams = []

    this.onConflictQuery = ""
    this.onConflictParams = []

    this.returningQuery = ""
    this.returningParams = []
  }
}

export default PgBuilderRepository

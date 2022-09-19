import logger from "./logger.helper"

interface IError {
  code: number | string
  message: string
  status: number
}

export const error = (code: string | number): IError => {
  /* -------------------------------------------------------------------------- */
  /*                                   numbers                                  */
  /* -------------------------------------------------------------------------- */
  switch (code) {
    case 1000:
      return { code, message: "Error Code is not a valid", status: 500 }

    case 1001:
      return { code, message: "Status Code is not a valid", status: 500 }

    case 1002:
      return { code, message: "Custome Error happening", status: 400 }

    case 1003:
      return { code, message: "Too Many Requests", status: 429 }

    case 1004:
      return { code, message: "Error on extending multipart header", status: 400 }

    case 1005:
      return { code, message: "Error on uploading file", status: 400 }

    case 1006:
      return { code, message: "MimeType is not valid", status: 400 }

    case 1007:
      return { code, message: "Upload Type not found", status: 400 }

    case 1008:
      return { code, message: "Upload ID not found", status: 400 }

    case 1009:
      return { code, message: "Uploaded more than max files", status: 400 }

    case 1010:
      return { code, message: "Token invalid", status: 401 }

    case 1011:
      return { code, message: "Token missing", status: 400 }

    case 1012:
      return { code, message: "Api Key missing", status: 400 }

    case 1013:
      return { code, message: "Api Key invalid", status: 401 }

    case 1014:
      return { code, message: "Method not allowed", status: 405 }

    /* -------------------------------------------------------------------------- */
    /*                                   Prisma                                   */
    /* -------------------------------------------------------------------------- */
    case "P2002":
      return { code, message: "Unique constraint failed", status: 400 }

    /* -------------------------------------------------------------------------- */
    /*                                   Strings                                  */
    /* -------------------------------------------------------------------------- */
    case "23505":
      return { code, message: "unique key is already exist", status: 500 }

    case "42P01":
      return { code, message: "Database Column Not Found", status: 500 }

    case "42703":
      return { code, message: "Database Column Not Found", status: 500 }

    case "42804":
      return { code, message: "Argument of WHERE must be type boolean, not type character varying", status: 500 }

    case "22P02":
      return { code, message: "Invalid input value for enum", status: 500 }

    case "ECONNREFUSED":
      return { code, message: "Database Connection Refused", status: 500 }

    default:
      logger.warn(`Error code ${code} is not valid`, { dest: "error.helper" })
      return { code, message: "Error Code is not a valid", status: 500 }
  }
}

export default error

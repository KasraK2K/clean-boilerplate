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
      return { code, message: "Status Code Code is not a valid", status: 500 }

    case 1002:
      return { code, message: "Custome Error happening", status: 500 }

    case 1003:
      return { code, message: "Too Many Requests", status: 429 }

    /* -------------------------------------------------------------------------- */
    /*                                   Strings                                  */
    /* -------------------------------------------------------------------------- */
    case "23505":
      return { code, message: "unique key is already exist", status: 500 }

    case "42P01":
      return { code, message: "Database Column Not Found", status: 500 }

    case "42703":
      return { code, message: "Database Column Not Found", status: 500 }

    case "ECONNREFUSED":
      return { code, message: "Database Connection Refused", status: 500 }

    default:
      return { code, message: "Error Code is not a valid", status: 500 }
  }
}

export default error

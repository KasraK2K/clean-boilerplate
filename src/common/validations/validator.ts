import Ajv from "ajv"
import addFormats from "ajv-formats"
import ajvErrors from "ajv-errors"
const ajv = new Ajv({ allErrors: true, removeAdditional: true, useDefaults: true, coerceTypes: true })
addFormats(ajv)
ajvErrors(ajv)

export const validator = (
  data: Record<string, any>,
  schema: Record<string, any>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (validate.errors)
    for (const error of validate.errors) {
      const parameter =
        error.instancePath && error.instancePath.length
          ? error.instancePath.replace("/", "")
          : error.params.missingProperty
      errors.push(`${parameter}: ${error.message}`)
    }
  return { valid, errors }
}

export default validator

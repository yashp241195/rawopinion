const { GraphQLError } = require("graphql")

const GQLError = (code, msg) => new GraphQLError(msg, { extensions: { code } })

const isValidInput = (joiSchema, input) => {
    const hasError = joiSchema.validate(input).error
    if (hasError) { throw GQLError(hasError.message, "INVALID_INPUT") } 
    return "VALID_INPUT" 
}


module.exports = { GQLError, isValidInput, }
enum HTTP_CODES {
  OK = 200,
  CREATED,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED_USER,
  NOT_FOUND = 404,
  INVALID_CONTENT = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export default HTTP_CODES;
import { makeVar } from "@apollo/client";
const getFromLocal = (key) => JSON.parse(localStorage.getItem(key))
const authVar = makeVar(getFromLocal('auth'))
export default authVar

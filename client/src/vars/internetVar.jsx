import { makeVar } from "@apollo/client";
const getFromLocalDirect = (key) => localStorage.getItem(key)
const internetVar = makeVar(getFromLocalDirect("hasInternet"))
export default internetVar

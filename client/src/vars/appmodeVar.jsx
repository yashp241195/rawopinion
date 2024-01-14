import { makeVar } from "@apollo/client";
const getFromLocalDirect = (key) => localStorage.getItem(key)
const init = getFromLocalDirect("appmode")
const appmodeVar = makeVar(init)
export default appmodeVar

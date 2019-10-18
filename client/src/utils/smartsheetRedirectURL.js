// const client_id = "i54vnrnj2rsr40tvmmb"; // prod
const client_id = "kvtcwablsd4z42jkqnu"; // dev

// export default `https://app.smartsheet.com/b/authorize?formName=fn_authorize&formAction=fa_loadAuthorize&response_type=code&client_id=${client_id}&scope=READ_SHEETS&state=MY_STATE`;

export default `https://app.smartsheet.com/b/authorize?response_type=code&client_id=${client_id}&scope=READ_SHEETS&state=`;

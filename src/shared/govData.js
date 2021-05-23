import axios from "axios";

const govData = (plate) => {
  console.log(plate);
  let response = axios
    .get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&filters={%22mispar_rechev%22:[%22${plate}%22]}`
    )
    .then((res) => {
      let result = res.data.result.records[0];
      console.log(result);
      return result;
    });

  console.log(response);
  return response;
};

export default govData;

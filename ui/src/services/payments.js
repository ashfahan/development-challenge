import axios from "axios";

const userServiceBaseUrl = "http://localhost:8080";

export const getPayments = async () => {
  const { data } = await axios.get(`${userServiceBaseUrl}/payments`);
  return data;
};

export const createPayment = async ({ applicationUuid, requestedAmount }) => {
  const { data } = await axios.post(`${userServiceBaseUrl}/payments`, {
    applicationUuid,
    paymentAmount: requestedAmount,
  });
  return data;
};

export const handleTablePagination = async (pageSize, page) => {
  const { data } = await axios.get(`${userServiceBaseUrl}/payments?pageNumber=${page}&pageSize=${pageSize}`);
  console.log(data);
  return data;
};

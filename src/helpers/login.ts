import { MyError } from "../lib/MyError";
import { formDataType } from "../lib/types";

export const loginOrSignUp = async ({
  formData,
  url,
}: {
  formData: formDataType;
  url: string;
}) => {
  const response = await fetch(`/api/user/${url}`, {
    body: JSON.stringify(formData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (response.status !== 200) {
    throw new MyError(data.message, response.status);
  }

  return data;
};

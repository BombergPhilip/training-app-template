"use server";

export async function setup(formData: FormData) {
  const weight = formData.get("weight");
  const height = formData.get("height");
  const birthDate = formData.get("birthDate");
  const pic = formData.get("pic");
  const gender = formData.get("gender");

  console.log({
    weight,
    height,
    birthDate,
    pic,
    gender,
  });
}

import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일은 필수 입력 항목입니다."),
  password: Yup.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(/[a-zA-Z]/, "비밀번호는 최소 하나의 문자를 포함해야 합니다.")
    .matches(/\d/, "비밀번호는 최소 하나의 숫자를 포함해야 합니다.")
    .required("비밀번호는 필수 입력 항목입니다."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 입력 항목입니다."),
});

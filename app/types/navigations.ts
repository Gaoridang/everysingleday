import { ParamListBase } from "@react-navigation/native";

// Expo Router에서 자동 생성된 타입을 확장
declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {
      // 학생 프로필 관련 라우트
      "/student/profile": undefined;
      "/student/profile/editModal": undefined;
      "/student/profile/ClassInfoScreen": undefined;
      "/student/profile/ClassListScreen": undefined;
      "/student/profile/JoinClassScreen": undefined;
      // 체크리스트 결과 화면
      "/student/checklists/result/[responseId]/index": {
        responseId: string;
      };
      // 다른 라우트들...
    }
  }
}

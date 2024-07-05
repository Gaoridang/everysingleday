import React, { ReactNode, createContext, useContext, useReducer } from "react";

// 체크리스트 아이템 타입 정의
interface ChecklistItem {
  description: string;
  order_num: number;
}

// 체크리스트 상태 타입 정의
interface ChecklistState {
  title: string;
  description: string;
  isPublic: boolean;
  scheduledAt: Date;
  items: ChecklistItem[];
}

// 액션 타입 정의
type ChecklistAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_IS_PUBLIC"; payload: boolean }
  | { type: "SET_SCHEDULED_AT"; payload: Date }
  | { type: "ADD_ITEM" }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_ITEM"; payload: { index: number; description: string } };

const offset = new Date().getTimezoneOffset() * 60 * 1000;
// 초기 상태
const initialState: ChecklistState = {
  title: "",
  description: "",
  isPublic: false,
  scheduledAt: new Date(Date.now() - offset),
  items: [{ description: "", order_num: 0 }],
};

// 리듀서 함수
const checklistReducer = (
  state: ChecklistState,
  action: ChecklistAction
): ChecklistState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_IS_PUBLIC":
      return { ...state, isPublic: action.payload };
    case "SET_SCHEDULED_AT":
      return { ...state, scheduledAt: action.payload };
    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...state.items,
          { description: "", order_num: state.items.length },
        ],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index
            ? { ...item, description: action.payload.description }
            : item
        ),
      };
    default:
      return state;
  }
};

// 컨텍스트 생성
const ChecklistCreationContext = createContext<
  | {
      state: ChecklistState;
      dispatch: React.Dispatch<ChecklistAction>;
    }
  | undefined
>(undefined);

// 컨텍스트 프로바이더 컴포넌트
export const ChecklistCreationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(checklistReducer, initialState);

  return (
    <ChecklistCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </ChecklistCreationContext.Provider>
  );
};

// 커스텀 훅 생성
export const useChecklistCreation = () => {
  const context = useContext(ChecklistCreationContext);
  if (context === undefined) {
    throw new Error(
      "useChecklistCreation must be used within a ChecklistCreationProvider"
    );
  }
  return context;
};

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import PagePagination from "./components/elTextBook/pagePagination/PagePagination";
import Footer from "./components/footer/Footer";
import GroupFlags from "./components/elTextBook/groupFlags/GroupFlags";
import randomWords from "./Utils/randomWords";
import { SET_USER_DATA } from "./redux/user/userTypes";
import { SET_SETTINGS } from "./redux/settings/settingsTypes";
import { SET_WORDS_GROUP_AND_PAGE } from "./redux/wordsGroupAndPage/wordsGroupAndPageTypes";
import { setUserData } from "./redux/user/userActions";
import { setSettings } from "./redux/settings/settingsActions";
import { setWordsGroupAndPage } from "./redux/wordsGroupAndPage/wordsGroupAndPageActions";

describe("Snapshot component", () => {
  it("Footer", () => {
    const rendered = render(<Footer />);
    expect(rendered).toMatchSnapshot();
  });

  it("GroupFlags", () => {
    const rendered = render(
      <GroupFlags number={1} current={0} key={1} handleFlagClick={() => {}} />
    );
    expect(rendered).toMatchSnapshot();
  });
});

describe("Function", () => {
  it("randomWords1", () => {
    expect(randomWords(["test1", "test2", "test3"])).toHaveLength(3);
  });
  it("randomWords2", () => {
    expect(randomWords(["test1", "test2", "test3"])).toContain("test1");
  });
  it("randomWords3", () => {
    expect(randomWords(["test1", "test2", "test3"])).toContain("test2");
  });
  it("randomWords4", () => {
    expect(randomWords(["test1", "test2", "test3"])).toContain("test3");
  });
});

describe("Redux types", () => {
  it("SET_USER_DATA", () => {
    expect(SET_USER_DATA).toBe("SET_USER_DATA");
  });
  it("SET_WORDS_GROUP_AND_PAGE", () => {
    expect(SET_WORDS_GROUP_AND_PAGE).toBe("SET_WORDS_GROUP_AND_PAGE");
  });
  it("SET_SETTINGS", () => {
    expect(SET_SETTINGS).toBe("SET_SETTINGS");
  });
});

describe("Redux actions", () => {
  it("User action", () => {
    expect(setUserData("test0")).toEqual({
      type: SET_USER_DATA,
      payload: "test0",
    });
  });
  it("Setting action", () => {
    expect(setSettings("test1")).toMatchObject({
      payload: "test1",
    });
  });
  it("WordsGroupAndPage action", () => {
    expect(setWordsGroupAndPage("test2")).toMatchObject({
      payload: "test2",
    });
  });
});

const mockStore = configureStore([]);

describe("PagePagination React-Redux Component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      wordsGroupAndPage: {
        group: 0,
        page: 0,
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <PagePagination maxPage={5} />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

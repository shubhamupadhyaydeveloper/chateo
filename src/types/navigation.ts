export type stackNavigationType = {
  AppScreen: undefined;
  ChatScreen: {
    userId: number;
    name: string;
    targetUserId: number;
    image: string;
  };
  UserScreen: undefined;
  AddContact: undefined;
  Testing: undefined;
  VideoCallScreen: undefined;
  JoinCall: undefined;
  ProfileDetail: {
    name: string;
    profileImage: string;
  };
  ProfileImage: {
    sharedTag:string;
    image : string
  };
  StatusContent : {
    index:number
  };
  SearchScreen : undefined,
  MotiAnimation : undefined;
  Reanimated:undefined;
  Carousel:undefined
};

export type authNavigationType = {
  Onboarding: undefined;
  EnterNumber:undefined;
  EnterCode:undefined;
  AuthProfile:undefined;
};

export type BottomTabNavigation = {
  HomeScreen: undefined;
  CallScreen: undefined;
  StatusScreen: undefined;
  CommunityScreen:undefined
};

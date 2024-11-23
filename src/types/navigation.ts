export type stackNavigationType = {
  AppScreen: undefined;
  ChatScreen: {
    userId: number;
    name: string;
    targetUserId: number;
    image: string;
  };
  UserScreen: undefined;
  SplashScreen: undefined;
  AddContact: undefined;
  Testing: undefined;
  VideoCallScreen: undefined;
  JoinCall: undefined;
};

export type BottomTabNavigation = {
  HomeScreen: undefined;
  CallScreen: undefined;
  StatusScreen: undefined;
  CommunityScreen:undefined
};

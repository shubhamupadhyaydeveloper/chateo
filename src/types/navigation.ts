export type stackNavigationType = {
  HomeScreen: undefined;
  ChatScreen: {
    userId: number;
    name: string;
    targetUserId: number;
    image: string;
  };
  VideoCallView: {email: string; roomId: number; self:any};
  UserScreen: undefined;
  SplashScreen: undefined;
  AddContact: undefined;
  Testing: undefined;
};

export type BottomTabNavigation = {
  HomeScreen: undefined;
  ChatScreen: {
    userId: number;
    name: string;
    targetUserId: number;
    image: string;
  };
  UserScreen: undefined;
  AddContact: undefined;
};
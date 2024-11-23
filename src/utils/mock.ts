import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CallScreen from '../screens/Call';
import {Icons} from './Icons';
import {BottomTabNavigation} from '../types/navigation';
import StatusScreen from '../feature/status/screens/StatusScreen';
import CommunityScreen from '../feature/community/screens/CommunityScreen';

export const tabNavigtionData: Array<{
  route: keyof BottomTabNavigation;
  label: string;
  type: any;
  activeIcon: string;
  inActiveIcon: string;
  component: React.ComponentType<any>;
  size?: number;
}> = [
  {
    route: 'HomeScreen',
    label: 'Chats',
    type: Icons.MaterialIcons,
    activeIcon: 'chat',
    inActiveIcon: 'chat-bubble-outline',
    component: HomeScreen,
    size: 23,
  },
  {
    route: 'CallScreen',
    label: 'Calls',
    type: Icons.Ionicons,
    activeIcon: 'call',
    inActiveIcon: 'call-outline',
    component: CallScreen,
    size: 23,
  },
  {
    route: 'CommunityScreen',
    label: 'Teams',
    type: Icons.Ionicons,
    activeIcon: 'people-sharp',
    inActiveIcon: 'people-outline',
    component: CommunityScreen,
    size: 23,
  },
  {
    route: 'StatusScreen',
    label: 'Updates',
    type: Icons.AntDesign,
    activeIcon: 'aliwangwang',
    inActiveIcon: 'aliwangwang-o1',
    component: StatusScreen,
    size: 23,
  },
];

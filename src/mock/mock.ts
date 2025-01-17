import HomeScreen from '../screens/HomeScreen/HomeScreen';

import {Icons} from '../utils/Icons';
import {BottomTabNavigation} from '../types/navigation';
import StatusScreen from '../feature/status/screens/StatusScreen';
import CommunityScreen from '../feature/community/screens/CommunityScreen';
import CallScreen from '../feature/voice_call/Call';

export const ProfileDetailOption = [
  {
    label: 'videocam-outline',
    type: Icons.Ionicons,
    name : 'Video'
  },
  {
    label: 'call-outline',
    type: Icons.Ionicons,
    name : 'Audio'
  },
  {
    label: 'search-sharp',
    type: Icons.Ionicons,
    name : 'Search'
  },
  {
    label: 'currency-rupee',
    type: Icons.MaterialIcons,
    name : 'Pay'
  },
];
export const ProfileDetailOption2 = [
  {
    label: 'notifications-none',
    type: Icons.MaterialIcons,
    name: 'Notifications',
  },
  {
    label: 'image-outline',
    type: Icons.Ionicons,
    name: 'Media visibility',
  },
  {
    label: 'lock-closed-outline',
    type: Icons.Ionicons,
    name: 'Encryption',
    message: 'Messages and calls are end-to-end encrypted.Tap to verify.',
  },
  {
    label: 'timer-outline',
    type: Icons.Ionicons,
    name: 'Disappearing messages',
  },
  {
    label: 'chatbox-ellipses-outline',
    type: Icons.Ionicons,
    name: 'Chat Lock',
    message: 'Lock annd hide this chat on this device',
  },
];

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
    route: 'StatusScreen',
    label: 'Updates',
    type: Icons.AntDesign,
    activeIcon: 'aliwangwang',
    inActiveIcon: 'aliwangwang-o1',
    component: StatusScreen,
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
];

export const countryOptions = [
  {
    name: 'india',
    icon: 'https://thumbs.dreamstime.com/b/india-paper-flag-patriotic-background-national-138241478.jpg',
  },
  {
    name: 'australia',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png',
  },
  {
    name: 'canada',
    icon: 'https://plus.unsplash.com/premium_photo-1674591172352-0af9308f0dac?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuYWRhJTIwZmxhZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'brazil',
    icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png',
  },
  {
    name: 'south-africa',
    icon: 'https://cdn.britannica.com/27/4227-050-00DBD10A/Flag-South-Africa.jpg',
  },
  {
    name: 'indonasia',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/800px-Flag_of_Indonesia.svg.png',
  },
  {
    name: 'france',
    icon: 'https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg',
  },
  {
    name: 'polland',
    icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png',
  },
  {
    name: 'neitherland',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/255px-Flag_of_the_Netherlands.svg.png',
  },
  {
    name: 'germany',
    icon: 'https://cdn.britannica.com/97/897-004-232BDF01/Flag-Germany.jpg',
  },
  {
    name: 'united-kingdom',
    icon: 'https://media.istockphoto.com/id/172348510/photo/united-kingdom-flag.jpg?s=612x612&w=0&k=20&c=hY9UFWsIsLGCGZfmPtX81igz3vlVvKZTRueomqLNi7I=',
  },
];


export const statusData = [
  {
    user: 'raju',
    profileImage: `https://avatar.iran.liara.run/public/boy?username=raju`,
    statusContent: [
      'https://images.unsplash.com/photo-1732394297043-31c5afccc2dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1645989240480-17beb976093a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVyaXRjYWwlMjBpYW1nZXxlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  {
    user: 'shubham',
    profileImage: `https://avatar.iran.liara.run/public/boy?username=shubham`,
    statusContent: [
      'https://images.unsplash.com/photo-1645989240480-17beb976093a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVyaXRjYWwlMjBpYW1nZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1645989240480-17beb976093a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVyaXRjYWwlMjBpYW1nZXxlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  {
    user: 'mohan',
    profileImage: `https://avatar.iran.liara.run/public/boy?username=mohan`,
    statusContent: [
      'https://images.unsplash.com/photo-1732631592378-f5c20fcc775f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1732394297043-31c5afccc2dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1645989240480-17beb976093a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVyaXRjYWwlMjBpYW1nZXxlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  {
    user: 'kishore',
    profileImage: `https://avatar.iran.liara.run/public/boy?username=kishore`,
    statusContent: [
      'https://images.unsplash.com/photo-1732639535051-63870f800ab7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
    ],
  },
].map(item => ({
  ...item,
  length: item.statusContent.length,
}));

export const homeMenuOptions = [
   'New group',
   'New broadcast',
   'Linked devices',
   'Starred messages',
   'Payments',
   'Settings'
]
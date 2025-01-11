import { SharedTransition, withSpring } from "react-native-reanimated";

export  const bouncyTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight,{damping : 80,stiffness : 350}),
    width: withSpring(values.targetWidth,{damping : 80,stiffness : 350}),
    originX: withSpring(values.targetOriginX,{damping : 80,stiffness : 350}),
    originY: withSpring(values.targetOriginY,{damping : 80,stiffness : 350}),
    borderRadius: withSpring(values.targetBorderRadius,{damping : 80,stiffness : 350}),
  };
});

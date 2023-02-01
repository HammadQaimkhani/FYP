import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
// console.log(height +" " + width);

const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

export default {setHeight, setWidth};

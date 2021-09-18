import {StyleSheet} from 'react-native';
import {fontsize16} from '../../Assets/Style/CommonStyle';
import {COLORS} from '../../Assets/utils/COLORS';

export const NotificationToolbarStyle = StyleSheet.create({
  TopToolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

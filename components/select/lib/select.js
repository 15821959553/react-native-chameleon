import React, {Component} from "react";
import {View, Text, StyleSheet, Image, Picker, Platform, Dimensions} from 'react-native';
import Proptypes from 'prop-types';
import {Touchable, TOUCHABLE_TYPES} from "@xzchameleon/touchable";
import {Modal} from "../../modal";
import {RowLine} from "../../rowLine";

/**
 * ---
 * page: select
 * ---
 *
 *
 * 模态选择组件
 */
const IS_IOS = Platform.OS === 'ios';

class Select extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue,
            preSelectedValue: this.props.selectedValue,
            index: 0,
        };
    }

    static getDerivedStateFromProps({selectedValue}, preState) {
        if (selectedValue !== preState.preSelectedValue) {
            return {
                selectedValue,
                preChecked: selectedValue,
            }
        }
        return null;
    }
    valueChanged = () => {
        let {onValueChanged, dataSource} = this.props;
        //如果未滑动 picker,点击确定默认设置第一项为选中项
        this.setState({
            selectedValue: dataSource[this.state.index],
        }, () => {
            onValueChanged && onValueChanged(this.state.value, this.state.index);
            this.modal.hide();
        });
    };
    valueChangedForAndroid = (value, index) => {
        if (value === '请选择') {
            return;
        }
        let {onValueChanged} = this.props;
        this.setState({
            selectedValue: value,
            index: index
        }, () => {
            onValueChanged && onValueChanged(this.state.value, this.state.index);
        });
    };

    render() {
        let {dataSource, style, textStyle, imgStyle, headerLeftText, headerCenterText, headerRightText, leftTextStyle, centerTextStyle, rightTextStyle, enabled, mode, itemStyle, prompt} = this.props;
        return (
            IS_IOS ?
                <Touchable touchComponent={TOUCHABLE_TYPES.OPACITY} onPress={() => enabled ? this.modal.show() : null}>
                    <View style={[SelectStyle.container, style]}>
                        <Text style={[SelectStyle.text, textStyle]}>{this.state.selectedValue}</Text>
                        <Image style={[SelectStyle.img, imgStyle]} source={require('../assets/image/trade_down.png')}/>
                        <Modal ref={(modal) => this.modal = modal} containerStyle={{justifyContent: 'flex-end'}} animationType={'slide'}>
                            <View style={SelectStyle.pickerContainer}>
                                <View style={SelectStyle.header}>
                                    <View style={SelectStyle.headerText}>
                                        <View style={SelectStyle.left}>
                                            <Touchable touchComponent={TOUCHABLE_TYPES.WITHOUT_FEEDBACK}
                                                       onPress={() => this.modal.hide()}>
                                                <View>
                                                    <Text style={[SelectStyle.leftText, leftTextStyle]}>{headerLeftText}</Text>
                                                </View>
                                            </Touchable>
                                        </View>
                                        <View style={SelectStyle.center}>
                                            <Text style={[SelectStyle.centerText, centerTextStyle]}>{headerCenterText}</Text>
                                        </View>
                                        <View style={SelectStyle.right}>
                                            <Touchable touchComponent={TOUCHABLE_TYPES.WITHOUT_FEEDBACK}
                                                       onPress={this.valueChanged}>
                                                <View>
                                                    <Text style={[SelectStyle.rightText, rightTextStyle]}>{headerRightText}</Text>
                                                </View>
                                            </Touchable>
                                        </View>
                                    </View>
                                    <RowLine height={1}/>
                                </View>
                                <Picker
                                    selectedValue={dataSource[this.state.index]}
                                    style={{width: '100%', height: 216}}
                                    onValueChange={(value, index) => this.setState({
                                        selectedValue: value,
                                        index: index
                                    })}
                                    itemStyle={itemStyle}
                                >
                                    {
                                        dataSource.map((value, index) => {
                                            return (
                                                <Picker.Item label={value} value={value} key={index + ''}/>
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </Modal>
                    </View>
                </Touchable>
                :
                <View style={[SelectStyle.pickerAndroid, style]}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        onValueChange={this.valueChangedForAndroid}
                        enabled={enabled}
                        mode={mode}
                        prompt={prompt}
                    >
                        {
                            ['请选择',...dataSource].map((value, index) => {
                                return (
                                    <Picker.Item label={value} value={value} key={index + ''}/>
                                )
                            })
                        }
                    </Picker>
                </View>
        );
    }
}

const SelectStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: '#ffffff',
    },
    pickerAndroid:{
        width:150,
        height:50,
        backgroundColor:'red',
    },
    text: {
        marginLeft: 8,
        fontSize: 15,
        color: '#383838',
    },
    img: {
        marginRight: 8,
    },
    header: {
        height: 42,
        backgroundColor: '#fff',
    },
    headerText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    leftText: {
        fontSize: 15,
        color: '#383838',
    },
    center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 16,
        color: '#383838',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 4,
    },
    rightText: {
        fontSize: 15,
        color: '#383838',
    },

});

Select.defaultProps = {
    selectedValue: '请选择',
    enabled:true,
    mode:'dialog',
};

Select.propTypes = {
    /**
     * 选择完成后的回调
     */
    onValueChanged:Proptypes.any,
    /**
     * 数据源
     */
    dataSource: Proptypes.array,
    /**
     * 默认选项
     */
    selectedValue: Proptypes.string,
    /**
     * 点击容器的样式
     */
    style: Proptypes.any,
    /**
     * 【iOS】左侧选择文本的样式
     */
    textStyle: Proptypes.any,
    /**
     * 【iOS】设置头部左侧文字
     */
    headerLeftText: Proptypes.string,
    /**
     * 【iOS】设置头部标题
     */
    headerCenterText: Proptypes.string,
    /**
     * 【iOS】设置头部右侧文字
     */
    headerRightText: Proptypes.string,
    /**
     * 【iOS】设置头部左侧文本样式
     */
    leftTextStyle:Proptypes.any,
    /**
     * 【iOS】设置头部标题样式
     */
    centerTextStyle:Proptypes.any,
    /**
     * 【iOS】设置头部右侧文本样式
     */
    rightTextStyle:Proptypes.any,
    /**
     * 选择是否可用
     */
    enable:Proptypes.bool,
    /**
     * 【Android】可以指定在用户点击选择器时，以怎样的形式呈现选项
     * 'dialog': 显示一个模态对话框。默认选项
     * 'dropdown': 以选择器所在位置为锚点展开一个下拉框
     */
    mode:Proptypes.string,
    /**
     * 【iOS】指定应用在每项标签上的样式
     */
    itemStyle:Proptypes.any,
    /**
     * 【Android】设置选择器的提示字符串。在Android的对话框模式中用作对话框的标题
     */
    prompt:Proptypes.string,
};

export default Select;
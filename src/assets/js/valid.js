/**
 * 验证共通方法
 */

import { Toast } from 'mint-ui';

// toast选项
const tOption = {
    duration: 1500,
    className: 'my-toast'
};

/**
 * input输入框不能为空
 * @model 调用时传过来的数据
 * @title 当前验证的title
 */
const inputRequired = function (model, title) {
        if (!model) {
         return `请填写${title}`;
        }
    return '';
};

/**
 * 必须选择标签
 * @model 调用时传过来的数据
 * @title 当前验证的title
 */
const tagRequired = function (model, title) {
    if (!model || (Array.isArray(model) && model.length <= 0)) {
        return `请选择${title}标签`;
    }
    return '';
};

/**
 * 获取验证结果的方法
 * @validRules 验证规则集合
 */
const getValid = function(validRules) {
    // 遍历验证规则
    for (let i in validRules) {
        let rule = validRules[i];
        // 1. rule为直接获取的验证结果
        if (typeof rule === 'string') {
            if (rule) {
                tOption.message = rule;
                Toast(tOption);
                return rule;
            }
        }
        // 2. rule为验证方法
        if (typeof rule === 'function') {
            // 调用方法获取验证结果
            let ruleReturn = rule();
            if (ruleReturn) {
                tOption.message = ruleReturn;
                Toast(tOption);
                return ruleReturn;
            }
        }
    }
    // 3. 无验证结果返回空字符串
    return '';
};

export default {
    inputRequired,
    tagRequired,
    getValid
}
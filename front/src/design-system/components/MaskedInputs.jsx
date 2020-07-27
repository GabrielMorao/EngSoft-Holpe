import React from "react";
import PropTypes from "prop-types"
import MaskedInput from "react-text-mask"

export function PhoneMask(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={['(', /[1-9]/, /[1-9]/, ')', ' ', '9', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    )
}

PhoneMask.propTypes = {
    inputRef: PropTypes.func.isRequired
}
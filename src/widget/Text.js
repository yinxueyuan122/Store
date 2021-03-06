/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

import React from 'react'
import ReactNative, {StyleSheet, Dimensions, Text} from 'react-native'
import color from './color'

export function Heading1({style, ...props}: Object) {
    return <Text style={[styles.h1, style]} {...props} />
}

export function Heading2({style, ...props}: Object) {
    return <Text style={[styles.h2, style]} {...props} />
}

export function Heading3({style, ...props}: Object) {
    return <Text style={[styles.h3, style]} {...props} />
}

export function Heading5({style, ...props}: Object) {
    return <Text style={[styles.h5, style]} {...props} />
}

export function Paragraph({style, ...props}: Object) {
    return <Text style={[styles.p, style]} {...props} />
}

export function Tip({style, ...props}: Object) {
    return <Text style={[styles.tip, style]} {...props} />
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 40,
        color: color.primary,
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    h3: {
        fontSize: 12,
        color: '#222222',
    },
    h5: {
        fontSize: 8,
        color: '#777777',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
    tip: {
        fontSize: 13,
        color: '#999999'
    }
})

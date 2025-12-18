package com.morchellapp.ml

import android.content.Context
import android.graphics.Bitmap

class MorchellaClassifier(context: Context) {

    private val model = TFLiteModel(context)

    fun predict(bitmap: Bitmap): Float {
        val input = ImageProcessorUtil.preprocess(bitmap)

        val output = Array(1) { FloatArray(1) }

        model.interpreter.run(input.buffer, output)

        return output[0][0]
    }
}

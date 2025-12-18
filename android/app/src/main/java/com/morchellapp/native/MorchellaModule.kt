package com.morchellapp.native

import android.graphics.BitmapFactory
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import com.morchellapp.ml.MorchellaClassifier
import java.io.File

class MorchellaModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val classifier = MorchellaClassifier(reactContext)

    override fun getName() = "MorchellaClassifier"

    @ReactMethod
    fun predict(imagePath: String, promise: Promise) {
        try {
            val bitmap = BitmapFactory.decodeFile(File(imagePath).absolutePath)
            val probability = classifier.predict(bitmap)
            val map = WritableNativeMap()
            map.putDouble("probability", probability.toDouble())
            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
}

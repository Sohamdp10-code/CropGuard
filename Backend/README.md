# Model assets

Place the trained Keras model here as `cropguard.keras`. Do not commit it if it is large; host it in your deployment provider's persistent storage or download it during the build.

`labels.json` defines the output-index order. Its index must exactly match the final softmax layer of your model. The current labels work only for a model trained on the eight CropGuard classes.

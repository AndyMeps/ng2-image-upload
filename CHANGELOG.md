<a name="1.0.0"></a>
# [1.0.0](https://github.com/andymeps/ng2-image-upload/compare/v0.2.3...v1.0.0) (2016-12-02)

### Notes

* Bumped the version number to 1.0.0 as this library is now being used in production implementations.

<a name="0.2.3"></a>
# [0.2.3](https://github.com/andymeps/ng2-image-upload/compare/v0.2.2...v0.2.3) (2016-11-16)

### Bugfix

* Removed readout of total filesize from component markup.

<a name="0.2.2"></a>
# [0.2.2](https://github.com/andymeps/ng2-image-upload/compare/v0.2.1...v0.2.2) (2016-11-16)

### New

* Added ability to set an upload size cap based on the sum of images uploaded (1MB = 1024KB).
* Improved remove image functionality to be a little more intuitive.

### Notes

* One new config item: `maxFilesizeSum: number`
* One new event handler output: `onError: Error`

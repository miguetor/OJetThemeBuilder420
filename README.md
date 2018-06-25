# OJetThemeBuilder420
Tips and Tricks for creating a new theme for Oracle JET 4.2.0

Oracle JET Theme Builder 4.2.0 Live demo: <br />
http://www.oracle.com/webfolder/technetwork/jet-420/public_samples/JET-Theme-Builder/public_html/index.html

Oracle JET Theme Builder 4.2.0 zip download: <br />
http://www.oracle.com/webfolder/technetwork/jet420/public_samples/JET-Theme-Builder.zip

# Change default OJET icons
Oracle JET uses images when icon fonts can't be used. Informational images must appear in high contrast mode for accessibility. <br /><br />

To improve performance, the SVG images used by JET components are sprited. JET does not support creating custom image sprites, and you must use a third-party tool to create them. However, if you use Oracle JET tooling, you can overwrite some of the default SVG images and use the tooling to combine them into a single sprite.svg file. <br /><br />

You can replace any of the SVG images in the following application directories. Note that your new image must use the same name as the original image. <br /><br />

- themes/alta/android/images <br />
- themes/alta/common/images  <br />
- themes/alta/ios/images     <br />
- themes/alta/web/images     <br />
- themes/alta/windows/images <br /><br />

When you build your application using ojet build or ojet serve commands, JET will automatically combine the SVG images into the sprite.svg file in the appropriate themes/alta/web/images/sprites/ directory.

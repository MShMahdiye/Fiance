import React, { useState } from 'react'
import { SketchPicker } from "react-color";

function ColorPicker() {

  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const { r, g, b, a } = sketchPickerColor;

  return (
    <div>
      <div>ColorPicker</div>
      <div>
        <SketchPicker
          onChange={(color) => {
            setSketchPickerColor(color.rgb);
          }}
          color={sketchPickerColor}
        /></div>
      <div>
      </div>
    </div>
  )
}

export default ColorPicker
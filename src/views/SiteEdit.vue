<template>
  <div>
    <h1>Add site</h1>
    <div role="main" class="ui-content">
      <b-form action="javascript:void(null);" method="post" id="locateform">
        <ul data-role="listview">
          <li class="ui-field-contain">
            <label for="name">Site Name</label>
            <input name="name" id="name" required />
          </li>
          <li>
            <fieldset data-role="controlgroup">
              <legend>Location Mode</legend>
              <input type="radio" value="gps" id="loc-gps" name="toggle" checked />
              <label for="loc-gps">GPS Lookup</label>
              <input type="radio" value="interactive" id="loc-interactive" name="toggle" />
              <label for="loc-interactive">Point on Map</label>
              <input type="radio" value="draw" id="loc-draw" name="toggle" />
              <label for="draw">Draw a polygon</label>
              <input type="radio" value="manual" id="loc-manual" name="toggle" />
              <label for="loc-manual">Enter Coordinates</label>
            </fieldset>
          </li>
          <li>
            <div class="map edit-map" id="locate-map"></div>
          </li>
          <li class="ui-field-contain">
            <label for="latitude">Latitude</label>
            <input name="latitude" id="latitude" type="number" step="0.000001" />
          </li>
          <li class="ui-field-contain">
            <label for="longitude">Longitude</label>
            <input name="longitude" id="longitude" type="number" step="0.000001" />
          </li>
          <li class="ui-field-contain">
            <label for="accuracy">GPS Accuracy</label>
            <input name="accuracy" id="accuracy" type="number" step="1" />
          </li>
          <li>
            <div class="ui-grid-a">
              <div class="ui-block-a">
                <a href="/" data-role="button" data-icon="back" data-direction="reverse">Back</a>
              </div>
              <div class="ui-block-b">
                <button type="submit" data-icon="check" data-theme="b">Continue</button>
              </div>
            </div>
          </li>
        </ul>
      </b-form>
    </div>
  </div>
</template>

<script>
// IF USER==staff FOR EDIT FUNCTIONALITY.

// Create Fresh Site Object?

export default {
  methods: {}
}
</script>

<style scoped>
</style>

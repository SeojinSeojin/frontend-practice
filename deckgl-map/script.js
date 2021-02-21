const { DeckGL, ScatterplotLayer, TextLayer, ArcLayer, IconLayer } = deck;

const my_home = {
    longitude: 127.029532,
    latitude: 37.600179
}
const skku = {
    longitude: 126.99362,
    latitude: 37.58825
}


new DeckGL({
    container: 'container',
    mapStyle: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
    initialViewState: {
        longitude: my_home.longitude,
        latitude: my_home.latitude,
        zoom: 13
    },
    controller: true,
    layers: [
        new ScatterplotLayer({
            data: [
                { position: [my_home.longitude, my_home.latitude], color: [255, 0, 0], radius: 50 }
            ],
            getPosition: d => d.position,
            getRadius: d => d.radius,
            getFillColor: d => d.color,
            opacity: 0.4
        }),
        new ScatterplotLayer({
            data: [
                { position: [skku.longitude, skku.latitude], color: [255, 255, 0], radius: 50 }
            ],
            getPosition: d => d.position,
            getRadius: d => d.radius,
            getFillColor: d => d.color,
            opacity: 0.4
        }),
        new TextLayer({
            data: [
                { position: [my_home.longitude, my_home.latitude + 0.001], text: 'My Home' }
            ],
            getPosition: d => d.position,
            getText: d => d.text
        }),
        new TextLayer({
            data: [
                { position: [skku.longitude, skku.latitude + 0.001], text: 'SKKU' }
            ],
            getPosition: d => d.position,
            getText: d => d.text
        }),
        new ArcLayer({
            data: [
                { source: [my_home.longitude, my_home.latitude], target: [skku.longitude, skku.latitude], sourceColor: [255, 0, 0], targetColor: [255, 255, 0], width: 10 }
            ],
            getSourcePosition: d => d.source,
            getTargetPosition: d => d.target,
            getSourceColor: d => d.sourceColor,
            getTargetColor: d => d.targetColor,
            getWidth: d => d.width
        })
    ]
});
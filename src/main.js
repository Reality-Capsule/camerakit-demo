import { 
    bootstrapCameraKit,
    createMediaStreamResource,
    Transform2D,
} from '@snap/camera-kit'

(async function() {
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTIzODM2LCJzdWIiOiI5ODY3NTIwNi1hY2VhLTRjOWEtYjgxYS1kMDQ5OGQxNDhhNmR-U1RBR0lOR340NWM4NTQ0My1hNjllLTRlZDktYWNjMy0zMzFhMzQyOWQ2MzcifQ.dXAQ59yVjVFscVf1ab4USEbM_tRKAnMtYM1dlBg1aKU'});

    const session = await cameraKit.createSession();
    
    document.getElementById('canvas').replaceWith(session.output.live);

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['ddf1dc6a-204b-4530-a50e-15696980110c']);
    session.applyLens(lenses[0]);

    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode: 'environment',
    } });
    const source = await createMediaStreamResource(mediaStream, {
        cameraType: 'back',
    });
    await session.setSource(source);
    session.source.setRenderSize(window.innerWidth, window.innerHeight);
    session.play();
})();

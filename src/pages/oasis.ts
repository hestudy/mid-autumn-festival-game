import {
  AssetType,
  Camera,
  GLTFResource,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  Texture2D,
  UnlitMaterial,
  Vector3,
  WebGLEngine,
} from 'oasis-engine';
// @ts-ignore
import moonTexture from '@/assets/texture/moon.jpg';
import { FreeControl } from '@oasis-engine/controls';

class MoonRotateScript extends Script {
  onUpdate(deltaTime: number) {
    super.onUpdate(deltaTime);
    this.entity.transform.rotate(0.1, 0, 0);
  }
}

export const run = () => {
  const engine = new WebGLEngine('canvas');
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;

  const rootEntity = scene.createRootEntity('root');

  let cameraEntity = rootEntity.createChild('camera_entity');
  cameraEntity.transform.position = new Vector3(0, 0, 2.8);
  cameraEntity.transform.lookAt(new Vector3(0, 2, 0));
  cameraEntity.addComponent(Camera);
  cameraEntity.addComponent(FreeControl);

  let sphereEntity = rootEntity.createChild('sphere');
  let sphere = sphereEntity.addComponent(MeshRenderer);
  sphere.mesh = PrimitiveMesh.createSphere(engine, 2);
  sphereEntity.addComponent(MoonRotateScript);

  const material = new UnlitMaterial(engine);
  sphere.setMaterial(material);
  engine.run();

  engine.resourceManager
    .load([
      {
        type: AssetType.Texture2D,
        url: moonTexture,
      },
    ])
    .then((res) => {
      material.baseTexture = res[0] as Texture2D;
    });
  engine.resourceManager.load<GLTFResource>('/rabbitDraco.gltf').then((res) => {
    const rabbitEntity = res.defaultSceneRoot;
    rabbitEntity.transform.position = new Vector3(1, 0, 2.8);
    rootEntity.addChild(rabbitEntity);
  });
  document.onkeydown = (e) => {
    const keyNum = e.code;
    if (keyNum === 'KeyA') {
      sphereEntity.transform.rotate(0, 1, 0);
    }
    if (keyNum === 'KeyD') {
      sphereEntity.transform.rotate(0, -1, 0);
    }
  };
};

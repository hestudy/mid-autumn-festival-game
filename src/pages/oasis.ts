import {
  Camera,
  Color,
  GLTFResource,
  MeshRenderer,
  PrimitiveMesh,
  Script,
  Texture2D,
  UnlitMaterial,
  WebGLEngine,
} from 'oasis-engine';
// @ts-ignore
import moonTexture from '@/assets/texture/moon.jpg';

class MoonRotateScript extends Script {
  onUpdate(deltaTime: number) {
    super.onUpdate(deltaTime);
    this.entity.transform.rotate(-0.1, 0, 0);
  }
}

export const run = async () => {
  const engine = new WebGLEngine('canvas');
  engine.canvas.resizeByClientSize();

  const scene = engine.sceneManager.activeScene;

  const rootEntity = scene.createRootEntity('root');

  // 坐标轴
  const coordinateEntity = rootEntity.createChild('coordinate');
  coordinateEntity.transform.setPosition(-2, 5, 0);
  // 原点
  const originEntity = coordinateEntity.createChild('origin');
  const originRender = originEntity.addComponent(MeshRenderer);
  originRender.mesh = PrimitiveMesh.createSphere(engine, 0.1);
  const originMaterial = new UnlitMaterial(engine);
  originMaterial.baseColor = new Color(1, 1, 1, 1);
  originRender.setMaterial(originMaterial);
  // x轴
  const xEntity = coordinateEntity.createChild('x');
  xEntity.transform.setScale(100, 1, 1);
  const xRender = xEntity.addComponent(MeshRenderer);
  xRender.mesh = PrimitiveMesh.createCuboid(engine, 0.01, 0.01, 0.01);
  const xMaterial = new UnlitMaterial(engine);
  xMaterial.baseColor = new Color(255 / 255, 203 / 255, 107 / 255);
  xRender.setMaterial(xMaterial);
  // y轴
  const yEntity = coordinateEntity.createChild('y');
  yEntity.transform.setScale(1, 100, 1);
  const yRender = yEntity.addComponent(MeshRenderer);
  yRender.mesh = PrimitiveMesh.createCuboid(engine, 0.01, 0.01, 0.01);
  const yMaterial = new UnlitMaterial(engine);
  yMaterial.baseColor = new Color(38 / 255, 50 / 255, 56 / 255);
  yRender.setMaterial(yMaterial);
  // z轴
  const zEntity = coordinateEntity.createChild('z');
  zEntity.transform.setScale(1, 1, 100);
  const zRender = zEntity.addComponent(MeshRenderer);
  zRender.mesh = PrimitiveMesh.createCuboid(engine, 0.01, 0.01, 0.01);
  const zMaterial = new UnlitMaterial(engine);
  zMaterial.baseColor = new Color(150 / 255, 136 / 255, 131 / 255);
  zRender.setMaterial(zMaterial);

  // 月球
  const moonEntity = rootEntity.createChild('moon');
  moonEntity.transform.setPosition(0, 0, 0);
  const moonRender = moonEntity.addComponent(MeshRenderer);
  moonRender.mesh = PrimitiveMesh.createSphere(engine, 2);
  const moonMaterial = new UnlitMaterial(engine);
  moonMaterial.baseTexture = await engine.resourceManager.load<Texture2D>(
    moonTexture,
  );
  moonRender.setMaterial(moonMaterial);
  moonEntity.addComponent(MoonRotateScript);

  // 兔子
  const rabbitEntity = rootEntity.createChild('rabbit');
  rabbitEntity.transform.setPosition(0, 2.2, 0);
  const { defaultSceneRoot } = await engine.resourceManager.load<GLTFResource>(
    '/rabbitDraco.gltf',
  );
  defaultSceneRoot.transform.setScale(0.005, 0.005, 0.005);
  rabbitEntity.addChild(defaultSceneRoot);

  // 相机
  let cameraEntity = rootEntity.createChild('camera');
  cameraEntity.transform.setPosition(
    rabbitEntity.transform.position.x,
    rabbitEntity.transform.position.y + 1.5,
    rabbitEntity.transform.position.z - 0.8,
  );
  cameraEntity.transform.lookAt(rabbitEntity.transform.position);
  cameraEntity.addComponent(Camera);

  engine.run();
};

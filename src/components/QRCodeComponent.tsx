import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = ({ classCode }: { classCode: string }) => (
  <div>
    <h3>QR Code for Class</h3>
    <QRCodeSVG value={classCode} size={128} />
  </div>
);


export default QRCodeComponent;


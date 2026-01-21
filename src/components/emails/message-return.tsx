import { Html, Container, Img, Text } from "@react-email/components";
import { ContactFormData } from "../contact/contact-form";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const MessageReturnEmail = ({
  name = "Black",
  email = "supreme24d@gmail.com",
  phone = "123123456",
  message = "Testowa wiadomość",
}: ContactFormData) => {
  return (
    <Html lang="pl">
      <Container style={{ margin: "64px", fontFamily: "sans-serif" }}>
        <Img src={`${baseUrl}/istnelogo.png`} />
        <Text style={{ marginBottom: "0" }}>
          Imię: <b>{name}</b>
        </Text>
        <Text style={{ margin: "0" }}>
          Email: <b>{email}</b>
        </Text>
        <Text style={{ marginTop: "0" }}>
          Telefon: <b>{phone}</b>
        </Text>
        <Text>{message}</Text>
      </Container>
    </Html>
  );
};

export default MessageReturnEmail;

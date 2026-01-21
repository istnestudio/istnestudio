import { Html, Container, Img, Text } from "@react-email/components";

const baseUrl = process.env.DOMAIN
  ? `https://${process.env.DOMAIN}`
  : "http://localhost:3000";

const MessageConfirmationEmail = () => {
  return (
    <Html lang="pl">
      <Container style={{ margin: "64px", fontFamily: "sans-serif" }}>
        <Img src={`${baseUrl}/istnelogo.png`} />
        <Text style={{ fontSize: "20px", marginTop: "32px" }}>
          Dostaliśmy Twoją wiadomość - niedługo odpowiemy.
        </Text>
      </Container>
    </Html>
  );
};

export default MessageConfirmationEmail;

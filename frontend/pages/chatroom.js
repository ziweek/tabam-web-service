import Layout from "../components/layout";
import Message from "../components/chatroom/message";
import ChatCard from "../components/chatroom/chatcard";
import Head from "next/head";

export default function ChatRoom() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="pb-20">
          <ChatCard type="send" />
          <ChatCard type="receive" />
          <ChatCard type="send" />
          <ChatCard type="receive" />
          <ChatCard type="send" />
          <ChatCard type="receive" />
          <ChatCard type="send" />
          <ChatCard type="receive" />
        </div>
        <div className="fixed bottom-0">
          <Message className="w-full" />
        </div>
      </Layout>
    </div>
  );
}

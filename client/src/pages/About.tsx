export default function About() {
  return (
    <section style={{ padding: "0.5rem 0" }}>
      <h2
        style={{
          margin: "0 0 1.25rem 0",
          fontSize: "1.9rem",
          lineHeight: 1.1,
          color: "#0f172a",
        }}
      >
        About TOCA
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "2rem",
          alignItems: "center",
          maxWidth: 1240,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: 520,
              fontSize: "1.35rem",
              lineHeight: 1.45,
              color: "#0f172a",
            }}
          >
            Serving local communities throughout the United States and Canada,
            our training centers welcome players and families to find their
            best with classes, training sessions, and league play that meet
            players' respective skill-sets. Our soccer classes for ages 1 to 13
            are engaging and educational, while individual or group training
            sessions for ages 7 onwards offer progressive levels of training for
            players looking to challenge themselves while also having fun. From
            training sessions and group classes to camps, leagues, and more,
            TOCA offers community soccer experiences you won't find anywhere
            else!
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/images/about-hero.jpg"
            alt="TOCA player practicing soccer indoors"
            style={{
              width: "100%",
              maxWidth: 620,
              borderRadius: 10,
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}

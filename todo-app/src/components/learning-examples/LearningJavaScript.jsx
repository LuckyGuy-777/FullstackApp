const person = {
  name: "Ranga karanam",
  address: {
    line1: "123 Main St",
    city: "Hyderabad",
    country: "India",
  },
  profiles: ["twitter", "facebook", "instagram"],
  // 화살표 함수 사용.
  printProfile: () => {
    person.profiles.map((profile) => console.log(profile));
  },
};

export default function LearningComponent() {
  return (
    <div>
      <div>{person.name}</div>
      <div>{person.address.line1}</div>
      <div>{person.profiles[0]}</div>
      <div>{person.printProfile()}</div>
    </div>
  );
}

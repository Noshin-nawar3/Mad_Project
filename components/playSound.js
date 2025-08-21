async function playSound(animalSound) {
  console.log("Loading Sound");
  const { sound } = await Audio.Sound.createAsync(
    { uri: animalSound }   
  );
  setSound(sound);

  console.log("Playing Sound");
  await sound.playAsync();
}

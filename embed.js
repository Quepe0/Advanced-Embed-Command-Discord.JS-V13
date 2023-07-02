const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Tworzenie wiadomości w embed.')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Kolor twojego embeda')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Opis twojego embeda w formacie JSON')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Tytuł twojego embeda')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('Duże zdjęcie twojego embeda')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('thumbnail')
                .setDescription('Małe zdjęcie twojego embeda')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            await interaction.reply({ content: `> [BŁĄD] Nie posiadasz uprawnień do wykonania tej komendy!`, ephemeral: true });
            return;
        }

        const color = interaction.options.getString('color');
        const description = interaction.options.getString('description');
        const title = interaction.options.getString('title');
        const image = interaction.options.getString('image');
        const thumbnail = interaction.options.getString('thumbnail');

        let embedDescription;
        try {
            embedDescription = JSON.parse(description);
        } catch (error) {
            await interaction.reply({ content: `> [BŁĄD] Wprowadzony opis nie jest prawidłowym kodem JSON.`, ephemeral: true });
            return;
        }

        const embed = {
            color: color,
            description: embedDescription,
        };

        if (title) {
            embed.title = title;
        }

        if (image) {
            embed.image = { url: image };
        }

        if (thumbnail) {
            embed.thumbnail = { url: thumbnail };
        }

        await interaction.reply({ content: `> 👍 Twój embed został pomyślnie utworzony!`, ephemeral: true });
        await interaction.channel.send({ embeds: [embed] });
    },
};

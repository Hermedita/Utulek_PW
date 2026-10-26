using Microsoft.EntityFrameworkCore;

namespace Shelter_Hervas.Infrastructure.Database.Configuration.ConfigureConventions;

public static class ModelConfigurationBuilderExtensions
{
    public static ModelConfigurationBuilder EnumConventions(this ModelConfigurationBuilder builder)
    {
        builder.Properties<Enum>()
            .HaveConversion<string>()
            .HaveMaxLength(20);

        return builder;
    }
}
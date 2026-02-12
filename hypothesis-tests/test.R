# load packages
library(corrplot)
library(ggplot2) # get documentation for usage
library(dplyr)
library(car)
library(caret)

# -------------------------------------------------------------------------
#                             Hypothesis testing
# -------------------------------------------------------------------------

# 1 coarse and fine concrete category are the same

# 𝐻0: 𝜇coarse = 𝜇fine
# 𝐻1: 𝜇coarse ≠ 𝜇fine
# one way ANOVA p = 0.05
# Assumptions 1-3 passed by dataset design

# Assumption 4
ggplot(concrete_data, aes(x = concrete_category, y = concrete_strength, fill = concrete_category)) +
  geom_boxplot() +
  labs(title = "Concrete Strength by Category",
       x = "Concrete Category",
       y = "Concrete Strength") +
  theme_minimal() +
  theme(legend.position = "none")

# Assumption 5
# H0: the variable follows a normal distribution
# H1: the variable does NOT follow a normal distribution

install.packages("RVAideMemoire")   # install and load required library
library(RVAideMemoire)

byf.shapiro(concrete_strength ~ concrete_category, data=concrete_data) # assumption failed

# Non-parametric test - Kruskal-Wallis
kruskal.test(concrete_strength ~ concrete_category, data=concrete_data)

# p-value of 0.3364 > 0.05 for kruskal test. we fail to reject H0
# No difference between both categories

# ---------------------------------------------------------------------------

# 2 noflyash and flyash are the same

# 𝐻0: 𝜇noflyash = 𝜇flyash
# 𝐻1: 𝜇noflyash ≠ 𝜇flyash
# ANOVA one-way test p = 0.05
# Assumptions 1-3 passed by dataset design

# Assumption 4
ggplot(concrete_data, aes(x = isFlyAsh, y = concrete_strength, fill = isFlyAsh)) +
  geom_boxplot() +
  labs(title = "Concrete Strength by Fly Ash Content",
       x = "Contains Fly Ash",
       y = "Concrete Strength (MPa)") +
  scale_fill_manual(values = c("FALSE" = "skyblue", "TRUE" = "lightgreen")) +
  theme_minimal()

# Assumption 5
# H0: the variable follows a normal distribution
# H1: the variable does NOT follow a normal distribution

byf.shapiro(concrete_strength ~ isFlyAsh, data=concrete_data) # Assumption failed

# Non-parametric test - Kruskal-Wallis
kruskal.test(concrete_strength ~ isFlyAsh, data=concrete_data)

# p-value of 0.2324 > 0.05 for kruskal test. we fail to reject H0
# No difference between both categories

# -------------------------------------------------------------------------

# Test of independence between both categories (isFlyAsh and concrete_category)
chiq_table <- table(concrete_data$concrete_category,
                       concrete_data$isFlyAsh)
chiq_table

chisq.test(chiq_table, correct = FALSE)
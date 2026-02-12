# ---------- REGRESSION MODELS FOR CONCRETE STRENGTH -------------

# load packages
library(corrplot)
library(ggplot2) # get documentation for usage
library(dplyr)
library(car)
library(caret)

# ----------------------------------------------------------------------------
# Define Objective
# ----------------------------------------------------------------------------

# We want to examine the possible linear relation between concrete strength and 
# more than one independent variable (predictors)



# ----------------------------------------------------------------------------
# Performing Regression Analysis
# ----------------------------------------------------------------------------


concrete_reduced <- concrete_data[, c("cement", "slag", "flyAsh", "water",
                                      "superPlasticizer", "coarseAgg",
                                      "fineAgg", "age", "concrete_strength")]


corrplot(cor(concrete_reduced))
#forward stepwise fitting
model_0 <- lm(concrete_strength ~ cement, concrete_reduced)
summary.lm(model_0) # 24.71

model_1 <- lm(concrete_strength ~ cement + superPlasticizer, concrete_reduced)
summary.lm(model_1) # 34.98

model_2 <- lm(concrete_strength ~ cement + superPlasticizer
                + age, concrete_reduced)
summary.lm(model_2) # 48.01

model_3 <- lm(concrete_strength ~ cement + superPlasticizer + water
                + age, concrete_reduced)
summary.lm(model_3) # 49.66

model_4 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + age, concrete_reduced)
summary.lm(model_4) # 52.92

model_5 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + age, concrete_reduced)
summary.lm(model_5) # 56.81

model_6 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + slag + age, concrete_reduced)
summary.lm(model_6) # 59.43

model_7 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + slag + flyAsh + age, concrete_reduced)
summary.lm(model_7) # 61.25 -intercept, fine aggregate and coarse aggregate not statistically relevant

model_8 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + flyAsh + age, concrete_reduced)
summary.lm(model_8) # 57.3


# model_6 is the best model



# ----------------------------------------------------------------------------
#                           Test assumptions
# ----------------------------------------------------------------------------
# 1. Linearity

data.frame(colnames(concrete_reduced))

pairs(concrete_reduced[,c(9,1,5,4,8,2,6,7)], lower.panel = NULL, pch = 19,cex = 0.2)

plot(model_6, 1)

# predictor transformation
# log transforming age and superPlasticizer predictors
concrete_reduced_tfd <- concrete_reduced # create a new df for transformation ops
concrete_reduced_tfd$superPlasticizer <- log(concrete_reduced_tfd$superPlasticizer)
concrete_reduced_tfd$age <- log(concrete_reduced_tfd$age)
head(concrete_reduced_tfd) # contains -ve infinite values in 5th column
# handling -ve infinte values
concrete_reduced_tfd[sapply(concrete_reduced_tfd, is.infinite)] <- NA
concrete_clean <- na.omit(concrete_reduced_tfd)


model_9 <- lm(concrete_strength ~ cement + superPlasticizer + water
                 + age + slag, concrete_clean)
summary.lm(model_9)# 81.35

model_10 <- lm(concrete_strength ~ cement + superPlasticizer + water
              + age + slag + fineAgg, concrete_clean)
summary.lm(model_10) # doesn't improve model significantly

model_11 <- lm(concrete_strength ~ cement + superPlasticizer + water
               + age + slag + fineAgg + coarseAgg, concrete_clean)
summary.lm(model_11) # doesn't improve model significantly

# model 9 is the best

# retrying linearity assumption
data.frame(colnames(concrete_clean))

pairs(concrete_clean[,c(9,1,5,4,8,2)], lower.panel = NULL, pch = 19,cex = 0.2) # passed

# 2. Residuals independence
plot(model_9, 1) # roughly lies on the zero line. passed

# 3. normality of residuals
plot(model_9, 2) # all fitted to the diagonal. passed

# 4. homoscedasticity
plot(model_9, 3) # randomly scattered around the red line. passed

# 5. multicollinearity

vif(model_9) # all between 1 - 5. passed

# Regression Model is ;
# 23.914 + 0.097445*cement - 2.5451*superPlasticizer - 0.2374*water + 
# 9.75855*age + 0.0683*slag
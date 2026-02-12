# ---------- REGRESSION MODELS FOR CONCRETE STRENGTH -------------

# load packages
library(corrplot)
library(ggplot2) # get documentation for usage
library(dplyr)
library(car)
library(caret)

# ------------------------ Logistic Regression ----------------------------
# Define objective
# We want to fit a possible Logistic regression between isFlyAsh dependent variable
# and multiple possible independent variables. Basically, We want our possible model
# to correctly predict the likelihood that our concrete mix contains fly ash


# Logistic regression analysis

# new df for logistic regression operations
concrete_lr <- concrete_data
concrete_lr$superPlasticizer <- log(concrete_lr$superPlasticizer)
concrete_lr$age <- log(concrete_lr$age)
# handling -ve infinte values
concrete_lr[sapply(concrete_lr, is.infinite)] <- NA
concrete_lr <- na.omit(concrete_lr)

concrete_lr <- concrete_lr %>%
  mutate(isFlyAsh = ifelse(isFlyAsh == "FALSE", 0, 1))
# FALSE = 0 and TRUE = 1

model_logistic_1 <- glm(isFlyAsh ~ cement + superPlasticizer + water + flyAsh +
                          age + slag + fineAgg + coarseAgg + concrete_category
                        + concrete_strength, data = concrete_lr, family = "binomial")
summary(model_logistic_1) # perfect separation or quasi-complete separation problem

model_logistic_2 <- glm(isFlyAsh ~ cement + superPlasticizer + water +
                          age + slag + fineAgg + coarseAgg,
                        data = concrete_lr, family = "binomial") # remove collinear predictors
summary(model_logistic_2) # AIC 143.05

Imp <- varImp(model_logistic_2, scale=FALSE) # check individual influential contribution
Imp

model_logistic_3 <- glm(isFlyAsh ~ cement + slag + fineAgg + water + coarseAgg,
                        data = concrete_lr, family = "binomial") # remove least influential variables
summary(model_logistic_3) # AIC 145.12

Imp <- varImp(model_logistic_3, scale=FALSE) # recheck
Imp

model_logistic_4 <- glm(isFlyAsh ~ cement + slag + fineAgg + coarseAgg,
                        data = concrete_lr, family = "binomial") # keep most imp variables
summary(model_logistic_4) # AIC 165.69

# model_logistic_3 is best model for the logistic regression

# ---------------------------------------------------------------------------
# -------------------- Testing assumptions ----------------------------------
# ---------------------------------------------------------------------------

# calculate pi values as probs
probs <- predict(model_logistic_3, data = concrete_lr, type = "response")
concrete_lr$probs <- probs

# calculate logit(pi) values as logits
logits <- log(probs/(1-probs))
concrete_lr$logits <- logits

data.frame(colnames(concrete_lr))

# Scatterplot
pairs(concrete_lr[,c(13,1,2,4,6,7)], lower.panel = NULL, upper.panel = panel.smooth,
      pch = 19,cex = 0.2)

# Influential values?
plot(model_logistic_3, which = 4, id.n = 3)

# Multicollinearity
vif(model_logistic_3)


# plotting fitted regression curve
ggplot(concrete_lr, aes(x=cement+slag+water+age+superPlasticizer+fineAgg+coarseAgg, y=isFlyAsh)) + geom_point() +
  stat_smooth(method="glm", color="green", se=FALSE,
              method.args = list(family=binomial))
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Slider,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  DataUsageOutlined,
  CallOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  StarOutlined,
  TrendingUpOutlined
} from '@mui/icons-material';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: (theme.shape.borderRadius as number) * 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.primary.main}40`
  }
}));

const PopularBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  right: 20,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: 'white',
  fontWeight: 700,
  boxShadow: '0 4px 12px rgba(230, 0, 0, 0.3)',
  '& .MuiChip-icon': {
    color: 'white'
  }
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}10)`,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2)
}));

interface Plan {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  data: number;
  minutes: number;
  sms: number;
  features: string[];
  type: 'Bonga Zaidi' | 'Browse Ukibonga' | 'Browse Zaidi';
}

const plans: Plan[] = [
  {
    id: '499-bonga',
    name: 'KES 499',
    price: 499,
    data: 2,
    minutes: 500,
    sms: 250,
    type: 'Bonga Zaidi',
    features: ['Free 4G Router', 'Free Airtel-to-Airtel calls', 'Data rollover']
  },
  {
    id: '1499-browse',
    name: 'KES 1,499',
    price: 1499,
    popular: true,
    data: 32,
    minutes: 1200,
    sms: 600,
    type: 'Browse Ukibonga',
    features: ['Free 4G Router', 'Free Airtel-to-Airtel calls', 'Data rollover', 'Priority support']
  },
  {
    id: '1999-zaidi',
    name: 'KES 1,999',
    price: 1999,
    data: 72,
    minutes: 1000,
    sms: 500,
    type: 'Browse Zaidi',
    features: ['Free 4G Router', 'Free Airtel-to-Airtel calls', 'Data rollover', 'Premium support']
  },
  {
    id: '2999-premium',
    name: 'KES 2,999',
    price: 2999,
    data: 120,
    minutes: 1800,
    sms: 900,
    type: 'Browse Zaidi',
    features: ['Free 4G Router', 'Free Airtel-to-Airtel calls', 'Data rollover', '24/7 Premium support', 'Speed boost']
  }
];

const PlanSelector: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showAnnual, setShowAnnual] = useState(false);
  const [userNeeds, setUserNeeds] = useState({
    data: 0,
    minutes: 0,
    sms: 0
  });

  const getRecommendedPlan = () => {
    if (userNeeds.data === 0 && userNeeds.minutes === 0 && userNeeds.sms === 0) {
      return null;
    }

    // Calculate a score for each plan based on how well it matches the user's needs
    const scoredPlans = plans.map(plan => {
      // Calculate how much the plan exceeds the user's needs (penalize overage)
      const dataOverage = Math.max(0, plan.data - userNeeds.data) / userNeeds.data || 1;
      const minutesOverage = Math.max(0, plan.minutes - userNeeds.minutes) / userNeeds.minutes || 1;
      const smsOverage = Math.max(0, plan.sms - userNeeds.sms) / userNeeds.sms || 1;

      // Calculate how much the plan is lacking (penalize underage)
      const dataUnderage = Math.max(0, userNeeds.data - plan.data) / userNeeds.data || 0;
      const minutesUnderage = Math.max(0, userNeeds.minutes - plan.minutes) / userNeeds.minutes || 0;
      const smsUnderage = Math.max(0, userNeeds.sms - plan.sms) / userNeeds.sms || 0;

      // Calculate a "fit" score (lower is better)
      const fitScore = (dataOverage * 0.4) + (minutesOverage * 0.4) + (smsOverage * 0.2) +
                       (dataUnderage * 0.6) + (minutesUnderage * 0.6) + (smsUnderage * 0.6);

      // Calculate a value score (lower is better)
      const valueScore = plan.price / (plan.data + plan.minutes / 100 + plan.sms / 100);

      // Combine scores
      const overallScore = fitScore * 0.7 + valueScore * 0.3;

      return { ...plan, score: overallScore };
    });

    // Sort by score and return the best plan
    return scoredPlans.sort((a, b) => a.score - b.score)[0] || null;
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <Box sx={{ py: 10, background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
      <Container maxWidth="xl">
        <Stack spacing={8}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h2" gutterBottom>
              Choose Your Perfect Plan
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Tailored connectivity solutions for every lifestyle and budget
            </Typography>
          </Box>

          {/* Usage Calculator */}
          <GlassCard sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Tell us your needs
            </Typography>
            <Stack spacing={4}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Monthly Data: {userNeeds.data} GB
                </Typography>
                <Slider
                  value={userNeeds.data}
                  onChange={(_, value) => setUserNeeds(prev => ({ ...prev, data: value as number }))}
                  min={1}
                  max={150}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Monthly Minutes: {userNeeds.minutes}
                </Typography>
                <Slider
                  value={userNeeds.minutes}
                  onChange={(_, value) => setUserNeeds(prev => ({ ...prev, minutes: value as number }))}
                  min={100}
                  max={3000}
                  sx={{ color: 'secondary.main' }}
                />
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Monthly SMS: {userNeeds.sms}
                </Typography>
                <Slider
                  value={userNeeds.sms}
                  onChange={(_, value) => setUserNeeds(prev => ({ ...prev, sms: value as number }))}
                  min={50}
                  max={2000}
                  sx={{ color: 'info.main' }}
                />
              </Box>
            </Stack>
            
            {recommendedPlan && (
              <Box sx={{ mt: 3, p: 2, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 2 }}>
                <Typography variant="body2" color="success.main" textAlign="center">
                  💡 Recommended: {recommendedPlan.name} - {recommendedPlan.type}
                </Typography>
              </Box>
            )}
          </GlassCard>

          {/* Billing Toggle */}
          <Box textAlign="center">
            <FormControlLabel
              control={
                <Switch
                  checked={showAnnual}
                  onChange={(e) => setShowAnnual(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Monthly</Typography>
                  <Typography>Annual</Typography>
                  <Chip label="Save 20%" size="small" color="success" />
                </Stack>
              }
            />
          </Box>

          {/* Plans Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const isRecommended = recommendedPlan?.id === plan.id;
              const annualPrice = Math.round(plan.price * 12 * 0.8);
              
              return (
                <GlassCard
                  key={plan.id}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: isSelected ? 2 : 1,
                    borderColor: isSelected ? 'primary.main' : 'transparent',
                    transform: plan.popular ? 'scale(1.05)' : 'none'
                  }}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <PopularBadge
                      icon={<StarOutlined />}
                      label="Most Popular"
                    />
                  )}
                  
                  {isRecommended && !plan.popular && (
                    <PopularBadge
                      icon={<TrendingUpOutlined />}
                      label="Recommended"
                      sx={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                    />
                  )}

                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      {/* Plan Header */}
                      <Box textAlign="center">
                        <Typography variant="h6" color="text.secondary">
                          {plan.name}
                        </Typography>
                        <Typography variant="h3" color="primary.main" fontWeight="bold">
                          KES {showAnnual ? annualPrice.toLocaleString() : plan.price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {showAnnual ? '/year' : '/month'}
                        </Typography>
                        <Chip
                          label={plan.type}
                          size="small"
                          sx={{ mt: 1, background: 'rgba(0, 82, 204, 0.1)', color: 'secondary.main' }}
                        />
                      </Box>

                      <Divider />

                      {/* Plan Features */}
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <FeatureIcon>
                            <DataUsageOutlined />
                          </FeatureIcon>
                          <Box>
                            <Typography variant="h6">{plan.data} GB</Typography>
                            <Typography variant="body2" color="text.secondary">
                              High-speed data
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={2}>
                          <FeatureIcon>
                            <CallOutlined />
                          </FeatureIcon>
                          <Box>
                            <Typography variant="h6">{plan.minutes} mins</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Voice calls
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={2}>
                          <FeatureIcon>
                            <MessageOutlined />
                          </FeatureIcon>
                          <Box>
                            <Typography variant="h6">{plan.sms} SMS</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Text messages
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>

                      <Divider />

                      {/* Additional Features */}
                      <Stack spacing={1}>
                        {plan.features.map((feature, index) => (
                          <Stack key={index} direction="row" alignItems="center" spacing={1}>
                            <CheckCircleOutlined sx={{ color: 'success.main', fontSize: 16 }} />
                            <Typography variant="body2">{feature}</Typography>
                          </Stack>
                        ))}
                      </Stack>

                      {/* CTA Button */}
                      <Button
                        variant={isSelected ? "contained" : "outlined"}
                        fullWidth
                        size="large"
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          ...(isSelected && {
                            background: 'linear-gradient(135deg, #E60000, #CC0000)',
                            boxShadow: '0 8px 24px rgba(230, 0, 0, 0.3)'
                          })
                        }}
                        href={`https://wa.me/254740066232?text=I want to subscribe to ${plan.name} - ${plan.type}`}
                        target="_blank"
                      >
                        {isSelected ? 'Subscribe Now' : 'Select Plan'}
                      </Button>
                    </Stack>
                  </CardContent>
                </GlassCard>
              );
            })}
          </Box>

          {/* Bottom CTA */}
          <Box textAlign="center" sx={{ pt: 4 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Need help choosing? Our experts are here to help
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{ borderRadius: 3, px: 4 }}
              href="https://wa.me/254740066232"
              target="_blank"
            >
              Chat with Expert
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PlanSelector;
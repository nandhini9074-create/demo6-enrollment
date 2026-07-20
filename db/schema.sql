CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customerId VARCHAR UNIQUE NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES customers(id),
    cardId VARCHAR(100) NOT NULL,
    schemeCardId VARCHAR(100),
    cardScheme VARCHAR(20) NOT NULL,
    cardBin VARCHAR(12),
    cardLast4 VARCHAR(4) NOT NULL,
    schemeUserId VARCHAR(100),
    fingerPrint VARCHAR(50) UNIQUE,
    issuerBank VARCHAR(100),
    isActive BOOLEAN NOT NULL,
    profileId UUID,
    parentCardId VARCHAR,
    isSupplementary BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    activity VARCHAR,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user_cards_user_id FOREIGN KEY (user_id) REFERENCES customers(id),
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'PAUSED', 'BLOCKED'))
);

CREATE INDEX idx_user_cards_user_id_scheme_card_id ON user_cards(user_id, schemeCardId);

CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    traceId UUID NOT NULL,
    step VARCHAR NOT NULL,
    requestData JSONB,
    responseData JSONB,
    error JSONB,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);